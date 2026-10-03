import { useState } from "react"
import { Eye, Trash } from "lucide-react"

interface UrlCardProps {
  shorturl: string
  longurl: string
  clickCount: number
  onDelete?: () => void
}

const UrlCard = ({ shorturl, longurl, clickCount,onDelete }: UrlCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 mx-auto gap-2 mb-4 border-2 bg-white max-w-5xl p-4">
        <div className="col-start-1 col-end-4 row-start-1 row-end-3">
          <p>
            short url:{" "}
            <a className="text-blue-700 hover:underline" href={shorturl}>
              {shorturl}
            </a>
          </p>
          <p>
            original url:{" "}
            <a className="text-blue-700 hover:underline" href={longurl}>
              {longurl}
            </a>
          </p>
        </div>

        {/* Trigger Button */}
        <div className="col-start-4 flex justify-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Delete URL"
            className="hover:opacity-75 transition-opacity"
          >
            <Trash color="#ff0000" />
          </button>
        </div>

        <h2 className="col-start-4 row-start-2 row-end-3 text-center text-2xl flex gap-x-2 justify-center items-center">
          <Eye />
          {clickCount}
        </h2>
      </div>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Do you want to delete this item?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                No
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UrlCard