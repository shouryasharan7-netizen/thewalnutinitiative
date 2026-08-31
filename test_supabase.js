const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing insert...');
  const { data, error } = await supabase.from('contact_messages').insert({
    name: 'Test',
    email: 'test@example.com',
    message: 'test message'
  });
  if (error) {
    console.error('Error inserting:', error);
  } else {
    console.log('Success!', data);
  }
}
test();
