"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Instagram does not provide a web URL for sharing a post link.
const networks = [
  { label: "Facebook", Icon: FaFacebook, shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  {
    label: "X",
    Icon: FaXTwitter,
    shareUrl: (url, title) =>
      `https://x.com/intent/post?${new URLSearchParams({ url, text: title })}`,
  },
  { label: "Instagram", Icon: FaInstagram },
  { label: "LinkedIn", Icon: FaLinkedin, shareUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
];

// "Share via:" row of the blog details page. Shares the page that is open in the browser.
export default function ShareLinks({ title }) {
  const [shareMessage, setShareMessage] = useState("");

  const open = async (network) => {
    const url = window.location.href.split("#")[0];
    if (network.label === "Instagram") {
      try {
        if (navigator.share) {
          await navigator.share({ title, text: title, url });
          setShareMessage("");
        } else if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(url);
          setShareMessage("Link copied. Paste it into Instagram to share.");
        } else {
          setShareMessage("Copy this page link and paste it into Instagram to share.");
        }
      } catch {
        setShareMessage("Sharing was cancelled or unavailable. You can copy this page link to share it.");
      }
      return;
    }

    window.open(network.shareUrl(url, title), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-accent">Share via:</span>
        {networks.map((network) => (
          <button
            key={network.label}
            type="button"
            aria-label={`Share on ${network.label}`}
            onClick={() => open(network)}
            className="cursor-pointer text-ink transition-colors duration-300 hover:text-accent"
          >
            <network.Icon className="h-5 w-5" />
          </button>
        ))}
      </div>
      {shareMessage && (
        <p role="status" className="mt-2 text-xs text-ink/75">
          {shareMessage}
        </p>
      )}
    </>
  );
}
