"use client";

import { Editor, IAllProps } from "@tinymce/tinymce-react";

const API_KEY =
  process.env.NEXT_PUBLIC_TINY_MCE_EDITOR_API_KEY ??
  "cwv534qq1ybyticuep294lthpyjt481usjsn6v8mh2am5us0";

export default function BundledEditor(props: IAllProps) {
  return (
    <Editor
      {...props}
      apiKey={API_KEY}
      init={{
        resize: true,
        promotion: false,
        branding: false,
        plugins: [
          // Core editing features
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "visualchars",
          "wordcount",
          // premium features...
          "checklist",
          "mediaembed",
          "casechange",
          "export",
          "formatpainter",
          "pageembed",
          "a11ychecker",
          "tinymcespellchecker",
          "permanentpen",
          "powerpaste",
          "advtable",
          "advcode",
          "editimage",
          "advtemplate",
          "mentions",
          "tableofcontents",
          "footnotes",
          "mergetags",
          "autocorrect",
          "typography",
          "inlinecss",
          "markdown"
        ],
        toolbar:
          "undo redo | mergetags | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        menubar: "edit view insert format table tools",
        mergetags_prefix: "{{",
        mergetags_sufix: "}}",
        mergetags_list: [
          {
            value: "firstName",
            title: "First Name"
          },
          {
            value: "lastName",
            title: "Last Name"
          },
          {
            value: "phone",
            title: "Phone"
          }
        ]
      }}
    />
  );
}
