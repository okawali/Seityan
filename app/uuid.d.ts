declare namespace uuid {
	interface V1Options {
		node?: number[];
		clockseq?: number;
		msecs?: number | Date;
		nsecs?: number;
	}

	type V4Options = { random: number[] } | { rng: () => number[]; }

	interface UuidStatic {
		v1: V1;
		v4: V4;
		parse(id: string): number[];
		parse(id: string, buffer: number[], offset?: number): number[];
		parse(id: string, buffer: Buffer, offset?: number): Buffer;
		unparse(buffer: number[] | Buffer, offset?: number): string;
	}

	interface V1 {
		(options?: V1Options): string;
		(options: V1Options | null, buffer: number[], offset?: number): number[];
		(options: V1Options | null, buffer: Buffer, offset?: number): Buffer;
	}

	interface V4 {
		(options?: V4Options): string;
		(options: V4Options | null, buffer: number[], offset?: number): number[];
		(options: V4Options | null, buffer: Buffer, offset?: number): Buffer;
	}

}

declare module "uuid" {
	var uuid: uuid.UuidStatic & uuid.V4;
	export = uuid;
}

declare module "uuid/v4" {
	var uuidV4: uuid.V4;
	export = uuidV4;
}

declare module "uuid/v1" {
	var uuidV1: uuid.V1;
	export = uuidV1;
}