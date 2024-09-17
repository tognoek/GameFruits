export const handleCollision = (objectFisrt, objectSeccond) => {
    if (!objectFisrt.isActivate()) {
        return;
    }
    let delatX = objectSeccond.x - objectFisrt.x;
    let delatY = objectSeccond.y - objectFisrt.y;
    let distance = Math.sqrt(delatX * delatX + delatY * delatY);
    if (distance < objectFisrt.radius + objectSeccond.radius) {
        objectFisrt.vCollisionNorm = { x: delatX / distance, y: delatY / distance };
        objectSeccond.vCollisionNorm = { x: delatX / distance, y: delatY / distance };
        let vRelativeVelocity = {
            x: objectFisrt.vx - objectSeccond.vx,
            y: objectFisrt.vy - objectSeccond.vy
        }
        let speed = objectFisrt.vCollisionNorm.x * vRelativeVelocity.x + objectFisrt.vCollisionNorm.y * vRelativeVelocity.y;
        let implues = 2 * speed / (objectFisrt.mass + objectSeccond.mass);
        objectFisrt.moving(speed, objectSeccond, implues, -1);
        objectSeccond.moving(speed, objectFisrt, implues, 1);
        return objectFisrt.name === objectSeccond.name;
    }
    return false;
}

