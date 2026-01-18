import { FileText } from 'lucide-react';

interface EvidenceCardProps {
  title: string;
  children: React.ReactNode;
}

export default function EvidenceCard({ title, children }: EvidenceCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
          <FileText className="w-3 h-3 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
