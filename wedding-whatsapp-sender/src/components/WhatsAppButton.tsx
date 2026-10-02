import { MessageCircle, Send, Image as ImageIcon } from "lucide-react";

import {
  createWhatsAppUrl,
  createWhatsAppMessage,
} from "../services/whatsappService";

import weddingImage from "../assets/wedding-preview.jpeg";

interface WhatsAppButtonProps {
  phoneNumber: string;
  quote: string;
  description: string;
  invitationUrl: string;
  onSend: () => void;
}

export function WhatsAppButton({
  phoneNumber,
  quote,
  description,
  invitationUrl,
  onSend,
}: WhatsAppButtonProps) {

  /**
   * Open WhatsApp for the specific phone number.
   *
   * This sends TEXT only.
   */
  const handleWhatsAppText = () => {
    // Check phone number
    if (!phoneNumber.trim()) {
      alert("Please enter a WhatsApp number.");
      return;
    }

    // Check invitation URL
    if (!invitationUrl.trim()) {
      alert("Please enter the invitation URL.");
      return;
    }

    /**
     * Convert Sri Lankan number to international format.
     *
     * 0771234567 -> 94771234567
     */
    const normalizedPhone = phoneNumber
      .replace(/\D/g, "")
      .replace(/^0/, "94");

    /**
     * Validate Sri Lankan mobile number.
     */
    if (!/^94\d{9}$/.test(normalizedPhone)) {
      alert(
        "Please enter a valid Sri Lankan WhatsApp number.\n\nExample: 0771234567"
      );

      return;
    }

    const whatsappUrl = createWhatsAppUrl(
      phoneNumber,
      quote,
      description,
      invitationUrl
    );

    onSend();

    /**
     * Open WhatsApp chat for the
     * specified phone number.
     */
    window.location.href = whatsappUrl;
  };

  /**
   * Share IMAGE + TEXT.
   *
   * This uses the browser Web Share API.
   *
   * On supported mobile browsers:
   * WhatsApp can be selected from
   * the share sheet.
   */
  const handleShareImage = async () => {
    if (!invitationUrl.trim()) {
      alert("Please enter the invitation URL.");
      return;
    }

    try {
      /**
       * Get the wedding image.
       */
      const response = await fetch(weddingImage);

      if (!response.ok) {
        throw new Error("Unable to load wedding image.");
      }

      const blob = await response.blob();

      /**
       * Convert image into a File.
       */
      const file = new File(
        [blob],
        "wedding-invitation.jpeg",
        {
          type: blob.type || "image/jpeg",
        }
      );

      /**
       * Create the WhatsApp message.
       */
      const message = createWhatsAppMessage(
        quote,
        description,
        invitationUrl
      );

      /**
       * Check whether browser supports
       * sharing files.
       */
      if (
        !navigator.share ||
        !navigator.canShare ||
        !navigator.canShare({
          files: [file],
        })
      ) {
        alert(
          "Image sharing is not supported by this browser.\n\nPlease open this website on a mobile browser such as Chrome or Safari."
        );

        return;
      }

      /**
       * Open the native share sheet.
       *
       * User can select WhatsApp.
       */
      await navigator.share({
        text: message,
        files: [file],
      });

      onSend();

    } catch (error) {
      /**
       * User cancelled the share dialog.
       */
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "Unable to share wedding invitation:",
        error
      );

      alert(
        "Unable to share the wedding invitation. Please try again."
      );
    }
  };

  return (
    <div className="whatsapp-buttons">

      {/* 
        TEXT ONLY
        Opens WhatsApp directly for
        the entered phone number.
      */}
      <button
        type="button"
        className="whatsapp-button"
        onClick={handleWhatsAppText}
      >
        <MessageCircle size={21} />

        <span>Open WhatsApp</span>

        <Send size={18} />
      </button>

      {/* 
        IMAGE + TEXT
        Opens native share sheet.
      */}
      <button
        type="button"
        className="whatsapp-image-button"
        onClick={handleShareImage}
      >
        <ImageIcon size={21} />

        <span>Share Image + Text</span>
      </button>

      <p className="whatsapp-note">
        <strong>Open WhatsApp:</strong> Opens the selected
        number with the message ready to send.
        <br />
        <strong>Share Image + Text:</strong> Shares the
        wedding photo and invitation message together.
      </p>

    </div>
  );
}