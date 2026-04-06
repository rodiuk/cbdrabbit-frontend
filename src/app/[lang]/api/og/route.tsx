import { ImageResponse } from "next/og";

import type { NextRequest } from "next/server";

export const runtime = "edge";

const containerStyle = {
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative" as const,
  overflow: "hidden",
  background:
    "linear-gradient(135deg, #f8c341 0%, #ffca4e 42%, #f59a0c 100%)",
  color: "#4a2415",
  fontFamily: "sans-serif",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title") || "CBD Rabbit";
  const subtitle =
    searchParams.get("subtitle") ||
    "Thoughtful CBD candies with a calm, playful brand voice.";

  return new ImageResponse(
    (
      <div style={containerStyle}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(255,255,255,0.38), transparent 35%), radial-gradient(circle at bottom right, rgba(255,235,180,0.32), transparent 26%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            border: "32px solid rgba(255,255,255,0.18)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,243,212,0.22)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "64px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.03em",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff3d6",
                  border: "3px solid rgba(74,36,21,0.15)",
                  fontSize: 30,
                }}
              >
                R
              </div>
              CBD Rabbit
            </div>

            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.22)",
                fontSize: 24,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {lang}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 920,
              gap: 26,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 72,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: "-0.045em",
                textWrap: "balance",
              }}
            >
              {title}
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 820,
                fontSize: 30,
                lineHeight: 1.35,
                fontWeight: 500,
                color: "rgba(74,36,21,0.88)",
                textWrap: "balance",
              }}
            >
              {subtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 26,
              fontWeight: 600,
              color: "rgba(74,36,21,0.82)",
            }}
          >
            <div style={{ display: "flex" }}>cbdrabbit.shop</div>
            <div style={{ display: "flex" }}>Natural CBD candies</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
