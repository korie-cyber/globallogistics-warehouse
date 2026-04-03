-- Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Inventory table
CREATE TABLE inventory (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT,
  stock_level INTEGER NOT NULL DEFAULT 0,
  reorder_point INTEGER NOT NULL DEFAULT 0,
  price NUMERIC(10,2),
  supplier_email TEXT
);

-- Order logs table
CREATE TABLE order_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT NOT NULL,
  category TEXT,
  price NUMERIC(10,2),
  action TEXT CHECK (action IN ('inbound', 'outbound')) NOT NULL,
  quantity INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product manuals vector store
CREATE TABLE product_manuals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name TEXT,
  content TEXT,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
