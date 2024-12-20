"use client"

import React, { ErrorInfo, ReactNode } from 'react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(e: Error): ErrorBoundaryState {
    console.log("ErrorBoundary caught an error:", e)
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>There was an error loading this component</CardDescription>
          </CardHeader>
        </Card>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

