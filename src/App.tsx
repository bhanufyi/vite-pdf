import { useState, useEffect } from "react";
import "./App.css";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdf from "./assets/bhanufyi.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

const options = {
	cMapUrl: "cmaps/",
	standardFontDataUrl: "standard_fonts/",
};

type PDFFile = string | File | null;

const App = () => {
	const [file] = useState<PDFFile>(pdf);
	const [fileWidth, setFileWidth] = useState(window.innerWidth * 0.8); // 80% of window width

	useEffect(() => {
		function debounce(
			func: (...args: unknown[]) => void,
			wait: number
		): (...args: unknown[]) => void {
			let timeout: NodeJS.Timeout | null;

			return function executedFunction(...args: unknown[]) {
				const later = () => {
					if (timeout) {
						clearTimeout(timeout);
						func(...args);
					}
				};

				if (timeout) {
					clearTimeout(timeout);
				}

				timeout = setTimeout(later, wait);
			};
		}
		const handleResize = debounce(() => {
			setFileWidth(window.innerWidth * 0.8); // or however you wish to calculate the width
		}, 100);

		window.addEventListener("resize", handleResize);

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1 style={{ textAlign: "center" }}>PDF Viewer</h1>
			<Document file={file} options={options}>
				<Page
					pageNumber={1}
					width={fileWidth}
					className={"pdf-shadow"}
				/>
			</Document>
		</div>
	);
};

export default App;
