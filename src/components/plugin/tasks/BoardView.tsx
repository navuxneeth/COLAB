import { useEffect, useState } from "react";
import { MessageSquare, Bot, Hash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  frame_name: string;
  assignee_username: string;
  origin: "chat" | "feedback" | "ai";
  due_date: string | null;
  status: string;
}

const columns = [
  { id: "todo", label: "To Do", color: "bg-task-todo" },
  { id: "progress", label: "In Progress", color: "bg-task-progress" },
  { id: "review", label: "Review", color: "bg-task-review" },
  { id: "done", label: "Done", color: "bg-task-done" },
];

export const BoardView = () => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({
    todo: [],
    progress: [],
    review: [],
    done: [],
  });
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadTasks();
    const channel = supabase
      .channel("tasks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tasks",
        },
        () => loadTasks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadTasks = async () => {
    const { data } = await supabase
      .from("tasks")
      .select(`
        id,
        title,
        origin,
        status,
        due_date,
        frame:frame_id(name),
        assignee:assignee_id(username)
      `)
      .order("created_at", { ascending: false });

    if (data) {
      const tasksByStatus: Record<string, Task[]> = {
        todo: [],
        progress: [],
        review: [],
        done: [],
      };

      data.forEach((task: any) => {
        const taskObj: Task = {
          id: task.id,
          title: task.title,
          frame_name: task.frame?.name || "Unknown",
          assignee_username: task.assignee?.username || "Unknown",
          origin: task.origin,
          due_date: task.due_date,
          status: task.status,
        };

        if (tasksByStatus[task.status]) {
          tasksByStatus[task.status].push(taskObj);
        }
      });

      setTasks(tasksByStatus);
    }
  };

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = async (newStatus: string) => {
    if (!draggedTask || draggedTask.status === newStatus) {
      setDraggedTask(null);
      return;
    }

    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", draggedTask.id);

    if (error) {
      toast({
        title: "Failed to move task",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Task moved",
        description: `Moved to ${columns.find((c) => c.id === newStatus)?.label}`,
      });
    }

    setDraggedTask(null);
  };

  const getOriginIcon = (origin: Task["origin"]) => {
    switch (origin) {
      case "chat":
        return <MessageSquare className="w-3 h-3" />;
      case "feedback":
        return <Hash className="w-3 h-3" />;
      case "ai":
        return <Bot className="w-3 h-3" />;
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {columns.map((column) => (
          <div
            key={column.id}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("bg-primary/5");
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove("bg-primary/5");
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove("bg-primary/5");
              handleDragEnd(column.id);
            }}
            className="rounded-lg border border-border p-4 transition-colors"
          >
            <div className="mb-4">
              <div className={`h-1 ${column.color} rounded-full mb-3`} />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{column.label}</span>
                <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
                  {tasks[column.id]?.length || 0}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {tasks[column.id]?.length === 0 ? (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  No tasks in {column.label.toLowerCase()}
                </div>
              ) : (
                tasks[column.id]?.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onDragEnd={() => setDraggedTask(null)}
                    className={`p-3 border border-figma-border rounded-lg bg-background hover:border-primary/50 hover:shadow-sm transition-all cursor-move ${
                      draggedTask?.id === task.id ? "opacity-50 scale-95" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <span className="shrink-0 mt-0.5">{getOriginIcon(task.origin)}</span>
                      <span className="text-xs font-medium flex-1 break-words">
                        {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1 truncate">
                        <Hash className="w-3 h-3 shrink-0" />
                        <span className="truncate">{task.frame_name}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground truncate">
                        @{task.assignee_username}
                      </span>
                      {task.due_date && (
                        <span className="text-xs text-orange-500 shrink-0">
                          Due {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
