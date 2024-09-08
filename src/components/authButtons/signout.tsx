import { signOut } from "@/auth"
import { Button } from "@mui/material"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo : '/'})
      }}
    >
      <Button type="submit" variant="contained">Sign Out</Button>
    </form>
  )
}