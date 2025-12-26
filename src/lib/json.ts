export const formatJson = (input: string): string => {
  try {
    const parsed = JSON.parse(input)
    return JSON.stringify(parsed, null, 2)
  } catch {
    return ''
  }
}

export const generateTsInterface = (jsonString: string): string => {
  try {
    const obj = JSON.parse(jsonString)
    if (!obj || typeof obj !== 'object') return ''
    
    const lines = ['interface Data {']
    Object.entries(obj).forEach(([key, value]) => {
      const type = getTsType(value)
      lines.push(`  ${key}: ${type};`)
    })
    lines.push('}')
    return lines.join('\n')
  } catch {
    return ''
  }
}

const getTsType = (value: any): string => {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'any[]'
  switch (typeof value) {
    case 'string': return 'string'
    case 'number': return 'number'
    case 'boolean': return 'boolean'
    default: return 'any'
  }
}
