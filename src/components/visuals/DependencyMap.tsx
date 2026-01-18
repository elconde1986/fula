interface Props {
  central?: string;
  dependencies?: string[];
  warning?: string;
  nodes?: Array<{ id: string; dependencies: string[] }>;
  edges?: Array<{ from: string; to: string; label: string }>;
}

export default function DependencyMap({ central, dependencies, warning, nodes }: Props) {
  // Handle new format with nodes/edges
  if (nodes && nodes.length > 0) {
    const centralNode = nodes[0]; // First node is typically the central one
    const depNodes = nodes.slice(1);
    
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <div className="flex flex-col items-center">
          <div className="bg-blue-600 text-white rounded-full px-4 py-2 mb-4 font-semibold text-sm shadow-md">
            {centralNode.id}
          </div>
          
          <div className="grid grid-cols-2 gap-2 w-full">
            {depNodes.map((node, i) => (
              <div key={i} className="bg-gray-100 rounded px-3 py-2 text-xs text-center border border-gray-300 text-gray-700">
                {node.id}
              </div>
            ))}
          </div>

          {warning && (
            <div className="mt-3 px-3 py-1 bg-red-100 text-red-800 rounded text-xs font-medium border border-red-200">
              {warning}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Handle legacy format with central/dependencies
  const safeDependencies = dependencies || [];
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex flex-col items-center">
        <div className="bg-blue-600 text-white rounded-full px-4 py-2 mb-4 font-semibold text-sm shadow-md">
          {central || 'Central'}
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          {safeDependencies.map((dep, i) => (
            <div key={i} className="bg-gray-100 rounded px-3 py-2 text-xs text-center border border-gray-300 text-gray-700">
              {dep}
            </div>
          ))}
        </div>

        {warning && (
          <div className="mt-3 px-3 py-1 bg-red-100 text-red-800 rounded text-xs font-medium border border-red-200">
            {warning}
          </div>
        )}
      </div>
    </div>
  );
}
