-- Health check function
CREATE OR REPLACE FUNCTION get_low_stock_items()
RETURNS TABLE (
  id UUID, item_name TEXT, category TEXT,
  stock_level INTEGER, reorder_point INTEGER,
  price NUMERIC, supplier_email TEXT
) AS $$
  SELECT id, item_name, category, stock_level, reorder_point, price, supplier_email
  FROM inventory WHERE stock_level < reorder_point;
$$ LANGUAGE SQL;

-- RAG similarity search function
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  match_count INT DEFAULT 5,
  filter JSONB DEFAULT '{}'
)
RETURNS TABLE (id UUID, content TEXT, metadata JSONB, similarity FLOAT)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT product_manuals.id, product_manuals.content,
    product_manuals.metadata,
    1 - (product_manuals.embedding <=> query_embedding) AS similarity
  FROM product_manuals
  WHERE product_manuals.metadata @> filter
  ORDER BY product_manuals.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
