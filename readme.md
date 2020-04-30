# APLICATIVO WEB COVID-19

Vamos a registrar información de familias para conocer su situación actual.

## VIVIENDA

- id
- direccion
- barrio
- municipio
- departamento
- estrato
- telefono
- nro_personas
- descripcion_situacion

## HABITANTES

- id_vivienda
- id_persona
- rol

```sql
CREATE TABLE public.habitantes
(
id_vivienda integer,
id_persona varchar,
rol varchar
)
```

## PERSONAS

- tipo_documento
- documento
- nombre
- celular
- correo
