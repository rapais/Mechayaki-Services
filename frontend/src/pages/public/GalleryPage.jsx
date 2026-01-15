export default function GalleryPage() {
  const imgs = [
    "/images/gallery/image1.jpg",
    "/images/gallery/image2.jpg",
    "/images/gallery/image3.jpg",
    "/images/gallery/image4.jpg",
    "/images/gallery/image5.jpg",
    "/images/gallery/image6.jpg",
  ];

  return (
    <section className="section">
      <div className="wrap">
        <h2 className="h2">Gallery</h2>
        <p className="p">A simple visual grid using your gallery assets.</p>

        <div className="mosaic" style={{ marginTop: 18 }}>
          {imgs.map((src, i) => <img key={i} src={src} alt={`Gallery ${i + 1}`} />)}
        </div>
      </div>
    </section>
  );
}
