interface Props {
  left: { title: string; bullets: string[] };
  right: { title: string; bullets: string[] };
}

export default function PaperVsStress({ left, right }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <h4 className="font-semibold text-gray-900 mb-2">{left.title}</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {left.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
        <h4 className="font-semibold text-gray-900 mb-2">{right.title}</h4>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {right.bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
