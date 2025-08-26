"use client"

import { createClient } from "@/lib/supabase/client"

function page() {
  const supabase  = createClient()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">

      <button onClick={()=>supabase.auth.signInWithOAuth({
        provider: 'google',
      })} type="button" className="px-5 py-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition font-serif font-extrabold">
        Sign in with Google
      </button>


    </div>
  )
}

export default page