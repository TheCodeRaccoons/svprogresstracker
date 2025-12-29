import './styles/ItemWithCounter.css';
type ItemWithCounterProps = {
    link: string;
    src: string;
    name: string;
    state: 'done' | 'known' | 'unknown';
    hoverDesc?: string;
    times?: number | undefined | null;
    /** When true, renders without an anchor to avoid navigation. */
    disableLink?: boolean;
}

const ItemWithCounter = ({
    link,
    src,
    name,
    state,
    hoverDesc,
    times,
    disableLink,
}: ItemWithCounterProps) => {
    const content = (
        <>
            <img
                src={src}
                alt={name}
                className={state}
                title={hoverDesc}
            />
            {times === undefined ? (
                <p className="item-unknown">?</p>
            ) : times === null ? null : (
                <p className="item-times"> x{times}</p>
            )}
        </>
    );

    if (disableLink) {
        return (
            <div className="item-with-counter">
                {content}
            </div>
        );
    }

    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="item-with-counter"
        >
            {content}
        </a>
    );
}

export default ItemWithCounter;