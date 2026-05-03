import type { ClusterTable } from "../../types"

interface FigureTable {
    clusterTable: ClusterTable
}

export default function FigureTable({ clusterTable }: FigureTable) {

    console.log(clusterTable)

    const { columnNames, rowValues } = clusterTable.dataTable

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse rounded-lg overflow-hidden shadow">
                <thead>
                    <tr className="bg-blue-600 text-white text-left">
                        {columnNames.map((col) => (
                            <th key={col} className="px-4 py-3 font-semibold">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rowValues.map(([rowNum, cells]) => (
                        <tr key={rowNum} className="border-b border-gray-200 even:bg-gray-50 hover:bg-blue-50 transition-colors">
                            {cells.map((cell, i) => (
                                <td key={i} className="px-4 py-3">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {clusterTable.description && (
                <p className="mt-2 text-xs text-gray-500 italic">{clusterTable.description}</p>
            )}
        </div>
    )
}