// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jaegrgfjbvykwogoabfr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZWdyZ2ZqYnZ5a3dvZ29hYmZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczOTk1NDEsImV4cCI6MjA2Mjk3NTU0MX0.UsUqLMGdwaLnt1bAnGc82LPz1Eco7-tOyDGNDcoyTkM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);