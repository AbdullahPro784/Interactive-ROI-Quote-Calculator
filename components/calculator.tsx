"use client"

import * as React from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Calculator() {
    const [bill, setBill] = React.useState([33])
    const [open, setOpen] = React.useState(false)
    const savings = bill[0] * 240 * 0.3

    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 })
    const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

    React.useEffect(() => {
        spring.set(savings)
    }, [spring, savings])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Here we would handle the form submission
        console.log("Form submitted")
        setOpen(false)
    }

    return (
        <div className="flex flex-col gap-8 md:flex-row">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Calculator</CardTitle>
                    <CardDescription>Estimate your monthly expenses.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-3">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Monthly Bill: ${bill[0]}
                            </label>
                            <Slider
                                defaultValue={[33]}
                                max={500}
                                step={1}
                                value={bill}
                                onValueChange={setBill}
                                className="w-full"
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        Adjust the slider to see your potential savings.
                    </p>
                </CardFooter>
            </Card>

            <Card className="w-[350px] bg-zinc-900 dark:bg-zinc-50 border-zinc-900 dark:border-zinc-50 relative">
                <CardHeader>
                    <CardTitle className="text-zinc-50 dark:text-zinc-900">20 Year Savings</CardTitle>
                    <CardDescription className="text-zinc-400 dark:text-zinc-600">
                        Estimated savings over 20 years
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center pt-6 pb-20">
                    <div className="text-5xl font-bold text-zinc-50 dark:text-zinc-900">
                        $<motion.span>{display}</motion.span>
                    </div>
                </CardContent>
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="font-semibold">
                                See Full Report
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Get Your Full Report</DialogTitle>
                                <DialogDescription>
                                    Enter your details to receive the comprehensive savings breakdown.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="name" placeholder="John Doe" className="col-span-3" required />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input id="email" type="email" placeholder="john@example.com" className="col-span-3" required />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Get Report</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </Card>
        </div>
    )
}
