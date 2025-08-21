import React from "react";
import { Badge } from "./ui/badge";
import { 
  Activity, 
  Clock, 
  HardDrive, 
  Cpu,
  MemoryStick
} from "lucide-react";

const StatusBar = ({ activeModel, selectedTool }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ready': return 'bg-green-600';
      case 'Processing': return 'bg-yellow-600';
      case 'Error': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="h-8 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4 text-xs text-gray-400">
      {/* Left side - Model status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3" />
          <span>Status:</span>
          <Badge className={`text-xs ${getStatusColor(activeModel?.status)} text-white`}>
            {activeModel?.status || 'Ready'}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <span>Tool: {selectedTool}</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Vertices: {activeModel?.vertices || 0}</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Faces: {activeModel?.faces || 0}</span>
        </div>
      </div>

      {/* Right side - System info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <MemoryStick className="w-3 h-3" />
          <span>RAM: 85%</span>
        </div>

        <div className="flex items-center gap-1">
          <Cpu className="w-3 h-3" />
          <span>CPU: 42%</span>
        </div>

        <div className="flex items-center gap-1">
          <HardDrive className="w-3 h-3" />
          <span>GPU: RTX 4090</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>14:32:15</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;