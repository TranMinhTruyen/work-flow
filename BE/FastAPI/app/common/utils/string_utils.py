def to_camel_case(s: str) -> str:
    """
    Convert from snake case to camel case.
    Return camel string.
    Exp: my_var -> myVar
    """
    parts = s.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])
