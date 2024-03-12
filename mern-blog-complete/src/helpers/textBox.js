export const formats = ["header", "bold", "italic", "underline", "strike", "blockquote",
  "list", "bullet", "indent", "link", "image", "color", "clean",
];

export const modules = {
  toolbar: {
    container: [
      [{ header: [2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ color: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ]
  }
}