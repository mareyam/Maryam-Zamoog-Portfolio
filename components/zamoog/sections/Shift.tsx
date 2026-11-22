import Words from "../Words";

export default function Shift() {
  return (
    <section id="shift" aria-labelledby="shift-title" className="zm-section">
      <div className="zm-pin zm-full flex items-end pb-[12svh] pt-24">
        <div className="zm-wrap grid w-full items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="zm-eyebrow mb-5" data-rv>The shift</p>
            <h2 id="shift-title" className="zm-head zm-h2" data-words>
              <Words text="What if everything just worked together?" />
            </h2>
          </div>
          <p className="zm-lead md:col-span-4" data-pin>
            Imagine your calls, customers, conversations and everyday tasks working as one connected system.
          </p>
        </div>
      </div>
    </section>
  );
}
