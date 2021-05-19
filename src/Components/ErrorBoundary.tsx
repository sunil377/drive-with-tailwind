import { Component } from "react";

export class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        return this.state.hasError ? (
            <h1>something error happen</h1>
        ) : (
            this.props.children
        );
    }
}
