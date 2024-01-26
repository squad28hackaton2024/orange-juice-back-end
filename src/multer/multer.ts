import { randomBytes } from 'node:crypto'
import multer from 'fastify-multer'

export const upload = multer({
	dest: 'tmp/upload/',
	fileFilter: (_, file, cb) => {
		const mimes = [
			'image/png',
			'image/jpeg',
			'image/pjpeg',
		]

		if (mimes.includes(file.mimetype)) {
			cb(null, true)
		} else {
			cb(new Error('Invalid mime'))
		}
	},
	limits: {
		fileSize: 5 * 1024 * 1024
	},
	storage: multer.diskStorage({
		destination: (_, file, cb) => {
			cb(null, 'tmp/storage/')
		},
		filename: (_, file, cb) => {
			randomBytes(16, (err, hash) => {
				if (err) cb(err)

				const filename = `${hash.toString('hex')}-${file.originalname}`

				cb(null, filename)
			})
		}
	})
})