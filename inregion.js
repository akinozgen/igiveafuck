export default ({ x, y, regions }) => Object.keys(regions).filter(reg => (
    (x >= regions[reg].start.x && x <= regions[reg].end.x) &&
    (y >= regions[reg].start.y && y <= regions[reg].end.y)
))[0];