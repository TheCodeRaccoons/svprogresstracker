
type ItemWithCounterProps = {
    link: string;
    src: string;
    name: string;
    state: 'done' | 'known' | 'unknown';
    hoverDesc?: string;
    times?: number | undefined;
}

const ItemWithCounter = ({
    link,
    src,
    name,
    state,
    hoverDesc,
    times,
}: ItemWithCounterProps) => {
    return (
        <a 
            href={link} 
            target="blank"
            className="item-with-counter">
            <img 
                src={src} 
                alt={name} 
                className={state} 
                title={hoverDesc && hoverDesc}
                >
            </img>
            {!!times && <p className="item-times">x{times}</p>}
        </a>
    );
}

export default ItemWithCounter;