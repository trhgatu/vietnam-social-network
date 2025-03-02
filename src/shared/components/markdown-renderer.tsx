import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};
