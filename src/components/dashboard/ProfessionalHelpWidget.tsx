import { Mail, Phone, Instagram, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";

export default function ProfessionalHelpWidget() {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-black/20 backdrop-blur-xl group hover:border-primary/30 transition-all duration-500">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 blur-[50px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-1">
                            <ShieldCheck className="w-5 h-5 text-green-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                Professional Help
                            </span>
                        </h3>
                        <p className="text-xs text-gray-400">Direct access to expert guidance</p>
                    </div>
                    <div className="px-2 py-1 rounded-full bg-primary/20 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Priority
                    </div>
                </div>

                <div className="space-y-3">
                    <a
                        href="https://wa.me/919740634537"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/10 hover:border-green-500/30 hover:from-green-500/20 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 group-hover/item:scale-110 transition-transform">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-gray-200 group-hover/item:text-white transition-colors">WhatsApp Support</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-green-500 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                    </a>

                    <a
                        href="https://instagram.com/pruthviraj1984bc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/item flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-500/10 hover:border-pink-500/30 hover:from-pink-500/20 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-500 group-hover/item:scale-110 transition-transform">
                                <Instagram className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-gray-200 group-hover/item:text-white transition-colors">Instagram DM</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-pink-500 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                    </a>

                    <a
                        href="mailto:pruthviraj1984bc@gmail.com"
                        className="group/item flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/10 hover:border-blue-500/30 hover:from-blue-500/20 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover/item:scale-110 transition-transform">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span className="font-semibold text-gray-200 group-hover/item:text-white transition-colors">Email Us</span>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-blue-500 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all" />
                    </a>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    Available 24/7
                </div>
            </div>
        </div>
    );
}
