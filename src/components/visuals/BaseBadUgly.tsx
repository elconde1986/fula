interface Path {
  label: string;
  trigger: string;
  consequence: string;
  pressurePoint: string;
}

interface Props {
  base: Path;
  bad: Path;
  ugly: Path;
}

export default function BaseBadUgly({ base, bad, ugly }: Props) {
  const paths = [base, bad, ugly];
  const colors = [
    { bg: 'bg-green-50', border: 'border-green-200', label: 'text-green-800' },
    { bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'text-yellow-800' },
    { bg: 'bg-red-50', border: 'border-red-200', label: 'text-red-800' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {paths.map((path, i) => (
        <div key={i} className={`border-2 rounded-lg p-4 ${colors[i].bg} ${colors[i].border}`}>
          <div className={`font-semibold text-sm mb-2 ${colors[i].label}`}>
            {path.label} Path
          </div>
          <div className="text-xs text-gray-700 space-y-2">
            <div>
              <span className="font-medium">Trigger:</span> {path.trigger}
            </div>
            <div>
              <span className="font-medium">Consequence:</span> {path.consequence}
            </div>
            <div>
              <span className="font-medium">Pressure Point:</span> {path.pressurePoint}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
