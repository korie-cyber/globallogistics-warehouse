# GlobalLogistics Warehouse Orchestrator

A full-stack AI-powered warehouse management system built for GlobalLogistics Corp.

## Tech Stack
- **Backend**: n8n (self-hosted)
- **Database**: Supabase (PostgreSQL + pgvector)
- **Frontend**: React + Vite + Tailwind (Lovable)
- **AI**: OpenAI GPT-4o-mini + text-embedding-ada-002

## Features
- Inventory health check (items below reorder point)
- Inbound/outbound operations with validation
- AI Warehouse Assistant with RAG (product manuals)
- Live database querying via HTTP tools
- Error handling workflow with Bulgarian timezone timestamps

## Project Structure
/workflows         - n8n workflow JSON exports
/database          - SQL scripts for all tables
/src               - Frontend React application

## Database Setup
Run the SQL scripts in this order in Supabase:
1. `database/01_tables.sql` - Creates inventory, order_logs, product_manuals tables
2. `database/02_functions.sql` - Creates match_documents and get_low_stock_items functions
3. `database/03_seed.sql` - Seeds initial inventory data

## Frontend Local Setup
```bash
# Clone the repo
git clone https://github.com/korie-cyber/globallogistics-warehouse

# Install dependencies
npm install

# Start development server
npm run dev

# App runs on http://localhost:5173
```

## n8n Workflows
Import these JSON files into your n8n instance:
- `Warehouse Orchestrator - Main.json` - Main workflow handling all operations
- `RAG Ingestion.json` - One-time workflow to embed product manuals
- `Error Handler.json` - Error notification workflow

## Environment
Update the webhook URL in the frontend to point to your n8n instance:
https://your-n8n-instance.com/webhook/warehouse

## AI Agent Capabilities
The Warehouse AI Assistant can answer:
- "What items are below their reorder point?"
- "Show me recent outbound operations"
- "What does the manual say about [product]?"
- "How many units of X have we sold?"
