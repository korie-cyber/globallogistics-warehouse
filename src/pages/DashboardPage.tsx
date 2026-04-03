import { useState } from "react";
import { Activity, Loader2, CheckCircle2 } from "lucide-react";
import { warehouseApi } from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

interface HealthItem {
  id: number;
  item_name: string;
  category: string;
  stock_level: number;
  reorder_point: number;
  price: number;
  supplier_email: string;
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<HealthItem[] | null>(null);

  const runHealthCheck = async () => {
    setLoading(true);
    try {
      let data = await warehouseApi({ action: "health_check" });
      // n8n may wrap the response in an extra array
      if (Array.isArray(data) && data.length === 1 && Array.isArray(data[0])) {
        data = data[0];
      }
      const list: HealthItem[] = Array.isArray(data) ? data : data.low_stock_items ?? data.items ?? [];
      setItems(list);
    } catch {
      toast.error("Failed to run health check. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl">
      <PageHeader
        title="Dashboard"
        description="Monitor warehouse health and inventory status"
      >
        <button
          onClick={runHealthCheck}
          disabled={loading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Activity className="w-4 h-4" />
          )}
          Run Health Check
        </button>
      </PageHeader>

      {items === null && !loading && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Activity className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">
            Click "Run Health Check" to scan inventory levels
          </p>
        </div>
      )}

      {loading && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Scanning inventory…</p>
        </div>
      )}

      {items !== null && !loading && items.length === 0 && (
        <div className="rounded-xl border border-success/20 bg-success/5 p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-3" />
          <p className="text-success font-medium">All inventory healthy</p>
          <p className="text-sm text-muted-foreground mt-1">No items are below their reorder point</p>
        </div>
      )}

      {items !== null && !loading && items.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Item Name</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Category</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Price</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Stock Level</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Reorder Point</th>
                <th className="text-right px-5 py-3 font-medium text-muted-foreground">Shortage</th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">Supplier</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-border last:border-0 bg-warning/5 hover:bg-warning/10 transition-colors"
                >
                  <td className="px-5 py-3 font-medium">{item.item_name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{item.category}</td>
                  <td className="px-5 py-3 text-right font-mono">${item.price.toFixed(2)}</td>
                  <td className="px-5 py-3 text-right text-warning font-mono">{item.stock_level}</td>
                  <td className="px-5 py-3 text-right font-mono">{item.reorder_point}</td>
                  <td className="px-5 py-3 text-right text-warning font-mono font-medium">
                    {item.reorder_point - item.stock_level}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground text-xs">{item.supplier_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
