import { useState } from "react";
import { PackageMinus, Loader2 } from "lucide-react";
import { warehouseApi } from "@/lib/api";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export default function OutboundPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ item_name: "", category: "Electronics", price: "", quantity: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.item_name || !form.quantity) {
      toast.error("Item name and quantity are required.");
      return;
    }
    setLoading(true);
    try {
      const data = await warehouseApi({
        action: "inventory_operation",
        operation: "outbound",
        item_name: form.item_name,
        category: form.category,
        price: Number(form.price) || 0,
        quantity: Number(form.quantity),
      });
      if (data.status === "error") {
        toast.error(data.message + (data.available_quantity != null ? ` (Available: ${data.available_quantity})` : ""));
      } else if (data.status === "warning") {
        toast.warning("Stock is now below reorder point");
      } else {
        toast.success(data.message || "Item withdrawn from inventory");
        setForm({ item_name: "", category: "Electronics", price: "", quantity: "" });
      }
    } catch {
      toast.error("Failed to process outbound operation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <PageHeader title="Outbound" description="Withdraw items from warehouse inventory" />

      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5">Item Name <span className="text-destructive">*</span></label>
          <input
            type="text"
            value={form.item_name}
            onChange={(e) => setForm({ ...form, item_name: e.target.value })}
            placeholder="e.g. Cooling Fan X-1000"
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          >
            <option>Electronics</option>
            <option>Components</option>
            <option>Networking</option>
            <option>Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Quantity <span className="text-destructive">*</span></label>
            <input
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="0"
              min="1"
              className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PackageMinus className="w-4 h-4" />}
          Withdraw from Inventory
        </button>
      </form>
    </div>
  );
}
