import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { setTheme, theme } = useTheme();
    
    return (
        theme === "light" ? (
            <Button className="rounded-full" variant="ghost" size="icon" onClick={() => setTheme("dark")}>
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        ) : ( 
            <Button className="rounded-full" variant="ghost" size="icon" onClick={() => setTheme("light")}>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        )
    )

}