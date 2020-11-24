const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: ["small", false, "large", "huge"] }, { color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      ["link", "image", "video"],
      ["clean"]
    ],
  },
  clipboard: { matchVisual: false }
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "size",
  "color",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align"
];

export {
  modules,
  formats
};