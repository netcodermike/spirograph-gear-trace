import assert from 'node:assert/strict';
import test from 'node:test';
import {geometry} from './app.mjs';
test('Periods reduce by the greatest common divisor', () => {
  assert.equal(geometry(96,56,.84).turns,7); assert.equal(geometry(96,24,1).turns,1);
  assert.equal(geometry(96,56,0).turns,1);
});
test('The pen closes after the computed number of orbits', () => {
  for (const [r,g,d] of [[96,56,.84],[89,34,.61],[72,36,1],[45,15,0]]) {
    const model=geometry(r,g,d), start=model.point(0), end=model.point(2*Math.PI*model.turns);
    assert.ok(Math.hypot(end[0]-start[0],end[1]-start[1])<1e-8);
  }
});
test('The 2:1 rim pen traces a diameter', () => {
  const model=geometry(72,36,1); for(let t=0;t<7;t+=0.1) assert.ok(Math.abs(model.point(t)[1])<1e-10);
});
test('Invalid geometry is rejected', () => {
  for(const args of [[20,20,1],[0,2,1],[8,4,-.1],[20,4,1.1]]) assert.throws(()=>geometry(...args));
});
