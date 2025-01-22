import React from 'react'
import { Input } from "@/components/ui/input"

export default function Place({onChange}) {
  return (
    <Input
     className="py-4"
     onChange={onChange}
    placeholder="Where are you going?" />

  )
}
