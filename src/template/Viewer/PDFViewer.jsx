import { PDFViewer } from "@recogito/recogito-react-pdf";

class PDFViewerCustom extends PDFViewer {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Custom PDF Viewer</h1>
        {super.render()}
      </div>
    );
  }
}

export default PDFViewerCustom;