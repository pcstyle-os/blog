import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <div className="max-w-md text-center space-y-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 border border-red-500/50 rounded-full">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black uppercase tracking-tight">
                        <span className="text-red-500">404</span>
                        <br />
                        <span className="text-white text-2xl">LINK_NOT_FOUND</span>
                    </h1>

                    <p className="text-gray-500 font-mono text-sm leading-relaxed">
                        The requested short link does not exist or has been removed from our
                        system.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff00ff] text-black font-bold uppercase tracking-wide text-sm transition-all hover:bg-white hover:shadow-[0_0_20px_#ff00ff] active:scale-95"
                    >
                        <Home className="w-4 h-4" />
                        CREATE_NEW_LINK
                    </Link>
                </div>

                <p className="text-gray-700 text-xs font-mono uppercase tracking-wider">
                    ERROR_CODE: LINK_EXPIRED_OR_INVALID
                </p>
            </div>
        </main>
    );
}
