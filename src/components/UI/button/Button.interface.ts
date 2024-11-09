import { ReactNode } from "react"

export interface ButtonProps {
    onClick: () => void
    children: string | ReactNode
}