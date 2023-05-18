import { CgShapeCircle, CgShapeSquare, CgShapeTriangle } from 'react-icons/cg'

const iconsShapes = {
  Circle: (size: string) => (
    <CgShapeCircle size={size} className="text-teal-700" />
  ),
  Square: (size: string) => (
    <CgShapeSquare size={size} className="text-indigo-700" />
  ),
  Triangle: (size: string) => (
    <CgShapeTriangle size={size} className="text-orange-700" />
  ),
}

export default iconsShapes
