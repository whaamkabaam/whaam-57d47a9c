import { useState, useCallback } from "react";
import { Upload, CheckCircle, XCircle, Loader2, Trash2, RotateCcw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LiquidGlassCard } from "@/components/LiquidGlassEffects";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface QueuedFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  progress: number;
}

const GAME_TAGS = ["Valorant", "CS2", "Apex Legends", "Fortnite", "League of Legends", "Other"];

export default function Backend() {
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [gameTag, setGameTag] = useState<string>("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const addFiles = useCallback((files: FileList | File[]) => {
    const newFiles: QueuedFile[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        file,
        status: "pending" as const,
        progress: 0,
      }));

    if (newFiles.length === 0) {
      toast({ title: "No valid images", description: "Please select PNG, JPG, or WEBP files", variant: "destructive" });
      return;
    }

    setQueue((prev) => [...prev, ...newFiles]);
    toast({ title: `Added ${newFiles.length} file(s)`, description: "Ready to upload" });
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
  }, [addFiles]);

  const uploadFile = async (queuedFile: QueuedFile): Promise<boolean> => {
    setQueue((prev) =>
      prev.map((f) => (f.id === queuedFile.id ? { ...f, status: "uploading", progress: 50 } : f))
    );

    try {
      const formData = new FormData();
      formData.append("file", queuedFile.file);
      if (gameTag) formData.append("gameTag", gameTag);
      formData.append("isFeatured", isFeatured.toString());

      const { data, error } = await supabase.functions.invoke("upload-review", {
        body: formData,
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setQueue((prev) =>
        prev.map((f) => (f.id === queuedFile.id ? { ...f, status: "success", progress: 100 } : f))
      );
      return true;
    } catch (error: any) {
      console.error("Upload error:", error);
      setQueue((prev) =>
        prev.map((f) =>
          f.id === queuedFile.id ? { ...f, status: "error", error: error.message, progress: 0 } : f
        )
      );
      return false;
    }
  };

  const startUpload = async () => {
    const pendingFiles = queue.filter((f) => f.status === "pending" || f.status === "error");
    if (pendingFiles.length === 0) {
      toast({ title: "No files to upload", variant: "destructive" });
      return;
    }

    setIsUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const queuedFile of pendingFiles) {
      const success = await uploadFile(queuedFile);
      if (success) successCount++;
      else errorCount++;
      // Small delay between uploads to avoid rate limits
      await new Promise((r) => setTimeout(r, 300));
    }

    setIsUploading(false);
    toast({
      title: "Upload complete",
      description: `${successCount} succeeded, ${errorCount} failed`,
      variant: errorCount > 0 ? "destructive" : "default",
    });
  };

  const retryFailed = () => {
    setQueue((prev) =>
      prev.map((f) => (f.status === "error" ? { ...f, status: "pending", error: undefined } : f))
    );
  };

  const clearQueue = () => setQueue([]);
  const removeFile = (id: string) => setQueue((prev) => prev.filter((f) => f.id !== id));

  const stats = {
    total: queue.length,
    pending: queue.filter((f) => f.status === "pending").length,
    uploading: queue.filter((f) => f.status === "uploading").length,
    success: queue.filter((f) => f.status === "success").length,
    error: queue.filter((f) => f.status === "error").length,
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Review Upload</h1>
          <p className="text-muted-foreground">Upload review screenshots to the gallery</p>
        </div>

        {/* Drop Zone */}
        <LiquidGlassCard variant="secondary" className="p-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
              isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-lg font-medium text-foreground mb-1">
              {isDragging ? "Drop files here" : "Drag & drop images"}
            </p>
            <p className="text-sm text-muted-foreground">or click to browse (PNG, JPG, WEBP)</p>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </div>
        </LiquidGlassCard>

        {/* Options */}
        <LiquidGlassCard variant="secondary" className="p-6">
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex-1 min-w-[200px]">
              <Label className="text-sm text-muted-foreground mb-2 block">Game Tag</Label>
              <Select value={gameTag} onValueChange={setGameTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Select game (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {GAME_TAGS.map((tag) => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              <Label htmlFor="featured" className="text-sm">Mark as Featured</Label>
            </div>
          </div>
        </LiquidGlassCard>

        {/* Queue */}
        {queue.length > 0 && (
          <LiquidGlassCard variant="secondary" className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-muted-foreground">
                {stats.total} files • {stats.success} done • {stats.error} failed
              </div>
              <div className="flex gap-2">
                {stats.error > 0 && (
                  <Button size="sm" variant="outline" onClick={retryFailed} disabled={isUploading}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Retry Failed
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={clearQueue} disabled={isUploading}>
                  <Trash2 className="w-4 h-4 mr-1" /> Clear
                </Button>
              </div>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {queue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
                >
                  <div className="w-6">
                    {item.status === "pending" && <div className="w-4 h-4 rounded-full bg-muted" />}
                    {item.status === "uploading" && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                    {item.status === "success" && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {item.status === "error" && <XCircle className="w-4 h-4 text-destructive" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate text-foreground">{item.file.name}</p>
                    {item.error && <p className="text-xs text-destructive truncate">{item.error}</p>}
                  </div>
                  <div className="text-xs text-muted-foreground w-16 text-right">
                    {(item.file.size / 1024 / 1024).toFixed(1)} MB
                  </div>
                  {!isUploading && item.status !== "uploading" && (
                    <button onClick={() => removeFile(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </LiquidGlassCard>
        )}

        {/* Upload Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={startUpload}
            disabled={isUploading || stats.pending + stats.error === 0}
            className="px-12"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading ({stats.uploading + stats.success}/{stats.total})
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Start Upload ({stats.pending + stats.error} files)
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
