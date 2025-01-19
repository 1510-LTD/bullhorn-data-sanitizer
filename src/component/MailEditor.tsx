"use client";

import { MergeTag } from "@/app/app-types";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

export const EmailMergeTags: MergeTag[] = [
  {
    title: "Recipient",
    menu: [
      {
        value: "firstName",
        title: "First Name"
      },
      {
        value: "lastName",
        title: "Last Name"
      },
      {
        value: "surName",
        title: "Surname"
      },
      {
        value: "dateOfBirth",
        title: "Date of Birth"
      },
      {
        value: "customTextBlock3",
        title: "Vetting Notes"
      }
    ]
  },
  {
    title: "Company",
    menu: [
      {
        value: "company.name",
        title: "Company Name"
      },
      {
        value: "company.companyURL",
        title: "Company Website"
      },
      {
        value: "company.phone",
        title: "Main Phone"
      },
      {
        value: "company.fullAddress",
        title: "Company Address"
      }
    ]
  },
  {
    title: "Job",
    menu: [
      {
        value: "job.title",
        title: "Job Title"
      },
      {
        value: "job.userId",
        title: "Consultant"
      },
      {
        value: "job.clientUserID",
        title: "Contact"
      },
      {
        value: "job.startDate",
        title: "Start Date"
      },
      {
        value: "job.dateEnd",
        title: "End Date"
      },
      {
        value: "job.salaryUnit",
        title: "Pay Unit"
      },
      {
        value: "job.payRate",
        title: "Pay Rate"
      },
      {
        value: "job.clientBillRate",
        title: "Charge Rate"
      },
      {
        value: "job.locationID",
        title: "Location"
      }
    ]
  }
];

const API_KEY =
  process.env.NEXT_PUBLIC_TINY_MCE_EDITOR_API_KEY ??
  "cwv534qq1ybyticuep294lthpyjt481usjsn6v8mh2am5us0";

export default function MailEditor({ ...props }: IAllProps) {
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
        mergetags_list: EmailMergeTags
      }}
    />
  );
}
