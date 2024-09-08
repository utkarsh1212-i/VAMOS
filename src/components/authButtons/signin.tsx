
import { signIn } from "@/auth"
import { Google } from "@mui/icons-material"

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { prompt: 'consent', redirectTo: '/home' })
      }}
    >
      <button type="submit" className="fixed left-0  cursor-pointer top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Signin with Google <Google /></button>
    </form>
  )
} 