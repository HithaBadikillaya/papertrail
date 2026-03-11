import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

interface ExportOptionsProps {
    content: string;
    filename?: string;
}

export function ExportOptions({ content, filename = "document" }: ExportOptionsProps) {
    const [copied, setCopied] = useState(false);
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            setCanShare(true);
        }
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: filename,
                text: content,
            });
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    const downloadFile = (fileContent: string, fileExtension: string, mimeType: string) => {
        const blob = new Blob([fileContent], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename}.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleDownloadMarkdown = () => {
        downloadFile(content, "md", "text/markdown");
    };

    const handleDownloadText = () => {
        downloadFile(content, "txt", "text/plain");
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        // Split text into lines that fit the page width
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10;
        const maxWidth = pageWidth - (margin * 2);
        const lines = doc.splitTextToSize(content, maxWidth);

        doc.text(lines, margin, margin + 10);
        doc.save(`${filename}.pdf`);
    };

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <button
                type="button"
                onClick={handleCopy}
                className={`px-4 py-2 rounded-sm font-bold text-xs tracking-wider transition-all border-2 border-foreground shadow-[3px_3px_0_var(--color-primary)] flex items-center gap-2 uppercase ${copied ? "bg-green-500 text-white" : "bg-foreground text-background hover:translate-x-[1px] hover:translate-y-[1px]"
                    }`}
            >
                {copied ? "COPIED!" : "COPY"}
            </button>

            {canShare && (
                <button
                    type="button"
                    onClick={handleShare}
                    className="px-4 py-2 rounded-sm font-bold text-xs tracking-wider transition-all border-2 border-foreground shadow-[3px_3px_0_var(--color-retro-sand)] flex items-center gap-2 uppercase bg-background text-foreground hover:translate-x-[1px] hover:translate-y-[1px]"
                >
                    Share
                </button>
            )}

            <div className="flex gap-1 bg-muted/20 p-1 border-2 border-foreground rounded-sm shadow-[3px_3px_0_var(--color-retro-sand)]">
                <button
                    onClick={handleDownloadMarkdown}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors text-muted-foreground hover:text-foreground"
                    title="Download Markdown"
                >
                    .MD
                </button>
                <button
                    onClick={handleDownloadPDF}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors text-muted-foreground hover:text-foreground border-l border-r border-foreground/20"
                    title="Download PDF"
                >
                    .PDF
                </button>
                <button
                    onClick={handleDownloadText}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider hover:bg-primary/20 transition-colors text-muted-foreground hover:text-foreground"
                    title="Download Text"
                >
                    .TXT
                </button>
            </div>
        </div>
    );
}
