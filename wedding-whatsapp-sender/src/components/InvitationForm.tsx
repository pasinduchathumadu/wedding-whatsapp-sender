import { Link, Phone, Quote, Sparkles } from "lucide-react";
import type { InvitationData } from "../types/invitation";

interface InvitationFormProps {
  data: InvitationData;
  onChange: (data: InvitationData) => void;
}

export function InvitationForm({
  data,
  onChange,
}: InvitationFormProps) {
  const updateField = (
    field: keyof InvitationData,
    value: string
  ) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleSlugChange = (value: string) => {
    const cleanSlug = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-_]/g, "");

    updateField("slug", cleanSlug);
  };

  return (
    <div className="form-card">
      <div className="card-heading">
        <div className="heading-icon">
          <Sparkles size={20} />
        </div>

        <div>
          <h2>Create Invitation</h2>
          <p>Enter the recipient details below</p>
        </div>
      </div>

      {/* WhatsApp Number */}
      <div className="form-group">
        <label htmlFor="phone">
          <Phone size={16} />
          WhatsApp Number
        </label>

        <input
          id="phone"
          type="tel"
          placeholder="077 123 4567"
          value={data.phoneNumber}
          onChange={(e) =>
            updateField("phoneNumber", e.target.value)
          }
        />

        <span className="input-help">
          Example: 0771234567
        </span>
      </div>

      {/* Invitation Slug */}
      <div className="form-group">
        <label htmlFor="slug">
          <Link size={16} />
          Invitation Slug
        </label>

        <input
          id="slug"
          type="text"
          placeholder="kasun"
          value={data.slug}
          onChange={(e) =>
            handleSlugChange(e.target.value)
          }
        />

        <span className="input-help">
          Example: kasun
        </span>
      </div>

      {/* Invitation Base URL */}
      <div className="form-group">
        <label htmlFor="invitationUrl">
          <Link size={16} />
          Invitation Base URL
        </label>

        <input
          id="invitationUrl"
          type="url"
          placeholder="https://yourdomain.com/wedding-invitation/#/invite"
          value={data.invitationUrl}
          onChange={(e) =>
            updateField(
              "invitationUrl",
              e.target.value
            )
          }
        />

        <span className="input-help">
          The part before the invitation slug
        </span>
      </div>

      {/* Wedding Quote */}
      <div className="form-group">
        <label htmlFor="quote">
          <Quote size={16} />
          Wedding Quote
        </label>

        <textarea
          id="quote"
          rows={3}
          placeholder="Two hearts, one beautiful journey..."
          value={data.quote}
          onChange={(e) =>
            updateField("quote", e.target.value)
          }
        />
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">
          Short Description
        </label>

        <textarea
          id="description"
          rows={4}
          placeholder="We would be delighted to have you with us as we celebrate our special day."
          value={data.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
        />
      </div>
    </div>
  );
}