import { User } from 'lucide-react';
import type { UserMessage as UserMessageType } from '../types';

interface Props {
  message: UserMessageType;
}

export default function UserMessage({ message }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-4 ml-auto max-w-3xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-blue-500 rounded-full">
          <User className="w-3 h-3 text-white" />
        </div>
        <div className="text-sm font-medium text-blue-700">USER</div>
      </div>
      <div className="text-gray-900 whitespace-pre-line leading-relaxed">{message.content}</div>
    </div>
  );
}
